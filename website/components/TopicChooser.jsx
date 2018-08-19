import React from 'react';
import topics from '../topics.json';

export const TopicChooser = props => {
    const items = topics.topics.map(topic => {
        return (
            <a
                key={topic.topic}
                href="#"
                className={'list-group-item list-group-item-action flex-column align-items-start' + (props.topic===topic.topic ? ' bg-secondary text-light' : '')}
                onClick={e => {e.preventDefault(); props.topicClicked(topic.topic)}}
            >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{topic.title}</h5>
                </div>
                <p className="mb-1">{topic.description}</p>
            </a>
        );
    });
    return (
        <ul className="list-group">
            {items}
        </ul>
    );
};
