import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapProps = (state, props) => {
    return {
        currentTopic: state.topic
    };
};

const mapDispatch = dispatch => {
    return {

    };
};

class TopicUi extends React.Component {
    render() {
        if (this.props.topic !== this.props.currentTopic) {
            return null;
        }

        return (
            <div className="container">
                { this.props.html &&
                <div dangerouslySetInnerHTML={{__html: this.props.html}}/>
                }
                { this.props.component &&
                <div className="row">
                    <div className="col">
                        {React.createElement(this.props.component)}
                    </div>
                </div>
                }
                { this.props.source &&
                <div className="row">
                    <div className="col">
                        <h3>Source Code</h3>
                        <SyntaxHighlighter language="javascript" style={agate}>
                            {this.props.source}
                        </SyntaxHighlighter>
                    </div>
                </div>
                }
                <div className="row mt-3" style={{borderTop:'1px solid #ccc',textAlign:'center',height:'3em'}}>
                    <div className="col">
                        <small className="text-muted">Copyright 2018 by Ken Schenke</small>
                    </div>
                </div>
            </div>
        );
    }
}

TopicUi.propTypes = {
    // Supplied by parent
    topic: PropTypes.string.isRequired,
    component: PropTypes.func,
    source: PropTypes.string,
    html: PropTypes.string,

    // Supplied by mapProps
    currentTopic: PropTypes.string.isRequired
};

export const Topic = connect(mapProps, mapDispatch)(TopicUi);
