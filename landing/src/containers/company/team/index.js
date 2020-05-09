import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from "gatsby"
import SectionTitle from '../../../components/shared/section-title'
import Team from '../../../components/team'
import {TeamSectionWrap, TeamWrapper, TeamContainer} from './team.stc'

const TeamSection = ({wrapperOne, wrapperTwo}) => {
    const teamQueryData = useStaticQuery(graphql `
        query TeamDataQuery {
            aboutdataJson(id: {eq: "about-team-section-content"}) {
                title
                subtitle
            }
            allTeamsJson {
                edges {
                  node {
                    id
                    name
                    designation
                    role
                    image {
                      childImageSharp {
                        fluid(maxWidth: 615, maxHeight: 720, quality: 100) {
                          ...GatsbyImageSharpFluid_withWebp
                          presentationWidth
                          presentationHeight
                        }
                      }
                    }
                  }
                }
            }
        }      
    `); 
    const teamSecData = teamQueryData.aboutdataJson;
    const teamMembers = teamQueryData.allTeamsJson.edges;
    const admins = teamMembers.filter(member => member.node.role === 'administrator');
    const employees = teamMembers.filter(member => member.node.role === 'employee'); 
    const delay = [300];
    return (
        <TeamSectionWrap>
            <TeamContainer>
                <div className="col-1 offset-1">
                    <SectionTitle
                        subtitle={teamSecData.subtitle}
                        title={teamSecData.title}
                    />
                </div>
                <TeamWrapper {...wrapperOne}>
                    <div className="row">
                        <div className="col-4 offset-1">
                            <div className="row">
                                {admins.map((admin, i) => {
                                    delay.push(delay[i] + 200)
                                    return(
                                        <div className="col-1" key={`admin-${admin.node.id}`}>
                                            <Team 
                                                imageSrc={admin.node.image.childImageSharp.fluid}
                                                name={admin.node.name}
                                                designation={admin.node.designation}
                                                animDelay={`${delay[i]}ms`}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </TeamWrapper> 
                <TeamWrapper {...wrapperTwo}>
                    <div className="row">
                        <div className="col-4 offset-1">
                            <div className="row">
                                {employees.map((employe, i) => (
                                    <div className="col-1" key={`employe-${employe.node.id}`}>
                                        <Team
                                            imageSrc={employe.node.image.childImageSharp.fluid}
                                            name={employe.node.name}
                                            designation={employe.node.designation}
                                            animDelay={`${delay[i]}ms`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TeamWrapper>
            </TeamContainer>
        </TeamSectionWrap>
    )
} 

TeamSection.propTypes = {
    wrapperOne: PropTypes.object,
    wrapperTwo: PropTypes.object
}

TeamSection.defaultProps = {
    wrapperOne: {
        pt: '75px'
    },
    wrapperTwo: {
        pt: '20px'
    }
}

export default TeamSection
