import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import topics from '../topics.json';
import C from '../constants';

const mapProps = state => {
    return {
        topic: state.topic
    };
};

const mapDispatch = dispatch => {
    return {
        topicClicked(topic, source) {
            dispatch({
                type: C.SET_TOPIC,
                payload: topic
            });
        }
    };
};

class TopicChooserUi extends React.Component {
    topicClicked = (event, topic, source) => {
        event.preventDefault();
        this.props.topicClicked(topic, source);
    };

    render() {
        const items = topics.topics.map(topic => {
            return (
                <a
                    key={topic.topic}
                    href="#"
                    className={'list-group-item list-group-item-action flex-column align-items-start' + (this.props.topic===topic.topic ? ' bg-secondary text-light' : '')}
                    onClick={e => this.topicClicked(e, topic.topic, topic.source)}
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
    }
}

TopicChooserUi.propTypes = {
    topic: PropTypes.string.isRequired,
    topicClicked: PropTypes.func.isRequired
};

export const TopicChooser = connect(mapProps, mapDispatch)(TopicChooserUi);
