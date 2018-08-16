import React from 'react';
import { TopicChooser } from './TopicChooser';
import { Topic } from './Topic';
import topics from '../topics.json';

import IntroHtml from '../html/Intro.html';

// import { GettingStarted } from './GettingStarted';
import GettingStartedHtml from '../html/GettingStarted.html';
// import GettingStartedSource from '../source/GettingStarted.txt';

import { Animation } from '../components/Animation';
import AnimationHtml from '../html/Animation.html';
import AnimationSource from '../source/Animation.txt';

//
// import DataTypesHtml from '../html/DataTypes.html';
//
// import InputTypesHtml from '../html/InputTypes.html';
//
// import ReduxStateHtml from '../html/ReduxState.html';
//
// import HelpersHtml from '../html/Helpers.html';
//
// import { Validation } from './Validation';
// import ValidationHtml from '../html/Validation.html';
// import ValidationSource from '../source/Validation.txt';
//
// import { AsyncValidation } from './AsyncValidation';
// import AsyncValidationHtml from '../html/AsyncValidation.html';
// import AsyncValidationSource from '../source/AsyncValidation.txt';
//
// import { Formatting } from './Formatting';
// import FormattingHtml from '../html/Formatting.html';
// import FormattingSource from '../source/Formatting.txt';
//
// import { AutoComplete } from './AutoComplete';
// import AutoCompleteHtml from '../html/AutoComplete.html';
// import AutoCompleteSource from '../source/AutoComplete.txt';
//
// import PropertiesReferenceHtml from '../html/PropertiesReference.html';

const topicMap = {
    intro: {
        html: IntroHtml
    },
    gettingstarted: {
        html: GettingStartedHtml
    },
    animation: {
        component: Animation,
        html: AnimationHtml,
        source: AnimationSource
    }
    // datatypes: {
    //     html: DataTypesHtml
    // },
    // inputtypes: {
    //     html: InputTypesHtml
    // },
    // reduxstate: {
    //     html: ReduxStateHtml
    // },
    // helpers: {
    //     html: HelpersHtml
    // },
    // validation: {
    //     component: Validation,
    //     html: ValidationHtml,
    //     source: ValidationSource
    // },
    // asyncvalidation: {
    //     component: AsyncValidation,
    //     html: AsyncValidationHtml,
    //     source: AsyncValidationSource
    // },
    // formatting: {
    //     component: Formatting,
    //     html: FormattingHtml,
    //     source: FormattingSource
    // },
    // autocomplete: {
    //     component: AutoComplete,
    //     html: AutoCompleteHtml,
    //     source: AutoCompleteSource
    // },
    // propertiesreference: {
    //     html: PropertiesReferenceHtml
    // }
};

export const App = () => {
    const topicComponents = topics.topics.map(topic => {
        return (
            <Topic
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
                    <TopicChooser/>
                </div>
                <div className="col">
                    {topicComponents}
                </div>
            </div>
        </div>
    );
};
