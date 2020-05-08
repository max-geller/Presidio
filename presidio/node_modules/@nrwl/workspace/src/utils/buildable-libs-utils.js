"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_graph_1 = require("../core/project-graph");
const path_1 = require("path");
const fileutils_1 = require("@nrwl/workspace/src/utils/fileutils");
const literals_1 = require("@angular-devkit/core/src/utils/literals");
const utils_1 = require("@nrwl/workspace/src/tasks-runner/utils");
const ts = require("typescript");
const fs_1 = require("fs");
function isBuildable(target, node) {
    return (node.data.architect &&
        node.data.architect[target] &&
        node.data.architect[target].builder !== '');
}
function calculateProjectDependencies(projGraph, context) {
    const target = projGraph.nodes[context.target.project];
    // gather the library dependencies
    const dependencies = recursivelyCollectDependencies(context.target.project, projGraph, [])
        .map(dep => {
        const depNode = projGraph.nodes[dep];
        if (depNode.type === project_graph_1.ProjectType.lib &&
            isBuildable(context.target.target, depNode)) {
            const libPackageJson = fileutils_1.readJsonFile(path_1.join(context.workspaceRoot, depNode.data.root, 'package.json'));
            return {
                name: libPackageJson.name,
                outputs: utils_1.getOutputsForTargetAndConfiguration(context.target.target, context.target.configuration, depNode),
                node: depNode
            };
        }
        else {
            return null;
        }
    })
        .filter(x => !!x);
    return { target, dependencies };
}
exports.calculateProjectDependencies = calculateProjectDependencies;
function recursivelyCollectDependencies(project, projGraph, acc) {
    (projGraph.dependencies[project] || []).forEach(dependency => {
        if (acc.indexOf(dependency.target) === -1) {
            acc.push(dependency.target);
            recursivelyCollectDependencies(dependency.target, projGraph, acc);
        }
    });
    return acc;
}
function readTsConfigWithRemappedPaths(tsConfig, dependencies) {
    const parsedTSConfig = ts.readConfigFile(tsConfig, ts.sys.readFile).config;
    parsedTSConfig.compilerOptions = parsedTSConfig.compilerOptions || {};
    parsedTSConfig.compilerOptions.paths = readPaths(tsConfig) || {};
    updatePaths(dependencies, parsedTSConfig.compilerOptions.paths);
    return parsedTSConfig;
}
exports.readTsConfigWithRemappedPaths = readTsConfigWithRemappedPaths;
function readPaths(tsConfig) {
    try {
        const parsedTSConfig = ts.readConfigFile(tsConfig, ts.sys.readFile).config;
        if (parsedTSConfig.compilerOptions &&
            parsedTSConfig.compilerOptions.paths) {
            return parsedTSConfig.compilerOptions.paths;
        }
        else if (parsedTSConfig.extends) {
            return readPaths(path_1.resolve(path_1.dirname(tsConfig), parsedTSConfig.extends));
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}
function createTmpTsConfig(tsconfigPath, workspaceRoot, projectRoot, dependencies) {
    const parsedTSConfig = readTsConfigWithRemappedPaths(tsconfigPath, dependencies);
    const tmpTsConfigPath = path_1.join(workspaceRoot, projectRoot, 'tsconfig.nx-tmp');
    process.on('exit', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
    });
    process.on('SIGTERM', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
        process.exit(0);
    });
    process.on('SIGINT', () => {
        cleanupTmpTsConfigFile(tmpTsConfigPath);
        process.exit(0);
    });
    fileutils_1.writeJsonFile(tmpTsConfigPath, parsedTSConfig);
    return path_1.join(projectRoot, 'tsconfig.nx-tmp');
}
exports.createTmpTsConfig = createTmpTsConfig;
function cleanupTmpTsConfigFile(tmpTsConfigPath) {
    try {
        if (tmpTsConfigPath) {
            fs_1.unlinkSync(tmpTsConfigPath);
        }
    }
    catch (e) { }
}
function checkDependentProjectsHaveBeenBuilt(context, projectDependencies) {
    const depLibsToBuildFirst = [];
    // verify whether all dependent libraries have been built
    projectDependencies.forEach(dep => {
        const paths = dep.outputs.map(p => path_1.join(context.workspaceRoot, p, 'package.json'));
        if (!paths.some(fileutils_1.fileExists)) {
            depLibsToBuildFirst.push(dep);
        }
    });
    if (depLibsToBuildFirst.length > 0) {
        context.logger.error(literals_1.stripIndents `
      Some of the project ${context.target.project}'s dependencies have not been built yet. Please build these libraries before:
      ${depLibsToBuildFirst.map(x => ` - ${x.node.name}`).join('\n')}

      Try: nx run ${context.target.project}:${context.target.target} --with-deps
    `);
        return false;
    }
    else {
        return true;
    }
}
exports.checkDependentProjectsHaveBeenBuilt = checkDependentProjectsHaveBeenBuilt;
function updatePaths(dependencies, paths) {
    dependencies.forEach(dep => {
        if (dep.outputs && dep.outputs.length > 0) {
            paths[dep.name] = dep.outputs;
        }
    });
}
exports.updatePaths = updatePaths;
/**
 * Updates the peerDependencies section in the `dist/lib/xyz/package.json` with
 * the proper dependency and version
 */
function updateBuildableProjectPackageJsonDependencies(context, node, dependencies) {
    const outputs = utils_1.getOutputsForTargetAndConfiguration(context.target.target, context.target.configuration, node);
    const packageJsonPath = `${outputs[0]}/package.json`;
    let packageJson;
    try {
        packageJson = fileutils_1.readJsonFile(packageJsonPath);
    }
    catch (e) {
        // cannot find or invalid package.json
        return;
    }
    packageJson.dependencies = packageJson.dependencies || {};
    let updatePackageJson = false;
    dependencies.forEach(entry => {
        if (!hasDependency(packageJson, 'dependencies', entry.name) &&
            !hasDependency(packageJson, 'devDependencies', entry.name) &&
            !hasDependency(packageJson, 'peerDependencies', entry.name)) {
            try {
                const outputs = utils_1.getOutputsForTargetAndConfiguration(context.target.target, context.target.configuration, entry.node);
                const depPackageJsonPath = path_1.join(context.workspaceRoot, outputs[0], 'package.json');
                const depPackageJson = fileutils_1.readJsonFile(depPackageJsonPath);
                packageJson.dependencies[entry.name] = depPackageJson.version;
                updatePackageJson = true;
            }
            catch (e) {
                // skip if cannot find package.json
            }
        }
    });
    if (updatePackageJson) {
        fileutils_1.writeJsonFile(packageJsonPath, packageJson);
    }
}
exports.updateBuildableProjectPackageJsonDependencies = updateBuildableProjectPackageJsonDependencies;
// verify whether the package.json already specifies the dep
function hasDependency(outputJson, depConfigName, packageName) {
    if (outputJson[depConfigName]) {
        return outputJson[depConfigName][packageName];
    }
    else {
        return false;
    }
}
