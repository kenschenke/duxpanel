import React from 'react';
import { TopicChooser } from './TopicChooser';
import { Topic } from './Topic';
import topics from '../topics.json';

/*
    Topics:

    Intro
    Getting Started
    DuxPanel Basics
    Responsive Panels
    Panel Animation
    Panel Stack
    DuxPanel Property Reference
    DuxDialog
    DuxOkDialog
    DuxYesNoDialog
 */

import IntroHtml from '../html/Intro.html';

import GettingStartedHtml from '../html/GettingStarted.html';

import { Basics } from '../components/Basics';
import BasicsHtml from '../html/Basics.html';
import BasicsSource from '../source/Basics.txt';

import { Responsive } from './Responsive';
import ResponsiveHtml from '../html/Responsive.html';
import ResponsiveSource from '../source/Responsive.txt';

import { Animation } from '../components/Animation';
import AnimationHtml from '../html/Animation.html';
import AnimationSource from '../source/Animation.txt';

import DuxPanelPropertiesHtml from '../html/DuxPanelProperties.html';

const topicMap = {
    intro: {
        html: IntroHtml
    },
    gettingstarted: {
        html: GettingStartedHtml
    },
    basics: {
        component: Basics,
        html: BasicsHtml,
        source: BasicsSource
    },
    responsive: {
        component: Responsive,
        html: ResponsiveHtml,
        source: ResponsiveSource
    },
    animation: {
        component: Animation,
        html: AnimationHtml,
        source: AnimationSource
    },
    properties: {
        html: DuxPanelPropertiesHtml
    }
};

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTopic: 'intro'
        };
    }

    topicClicked = topic => {
        this.setState({currentTopic: topic});
    };

    render() {
        const topicComponents = topics.topics.map(topic => {
            return (
                <Topic
                    show={topic.topic === this.state.currentTopic}
                    key={topic.topic}
                    topic={topic.topic}
                    component={topicMap[topic.topic].component}
                    source={topicMap[topic.topic].source}
                    html={topicMap[topic.topic].html}
                />
            );
        });

        return (
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-2">
                        <TopicChooser topic={this.state.currentTopic} topicClicked={this.topicClicked}/>
                    </div>
                    <div className="col">
                        {topicComponents}
                    </div>
                </div>
            </div>
        );
    }
}
