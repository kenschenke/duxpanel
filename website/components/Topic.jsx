import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

export const Topic = props => {
    if (!props.show) {
        return null;
    }

    return (
        <div className="container">
            { props.html &&
            <div dangerouslySetInnerHTML={{__html: props.html}}/>
            }
            { props.component &&
            <div className="row">
                <div className="col">
                    {React.createElement(props.component)}
                </div>
            </div>
            }
            { props.source &&
            <div className="row">
                <div className="col">
                    <h3>Source Code</h3>
                    <SyntaxHighlighter language="javascript" style={agate}>
                        {props.source}
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
};
