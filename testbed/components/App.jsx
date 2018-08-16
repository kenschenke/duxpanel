import React from 'react';
import { Section } from './Section';
import { Panel } from './Panel';
import { Responsive } from './Responsive';
import { Animation } from './Animation';
import { Dialog } from './Dialog';
import { OkDialog } from './OkDialog';
import { YesNoDialog } from './YesNoDialog';

export const App = () => (
    <div>
        <Section title="Panel" form={Panel} name="panel"/>
        <Section title="Responsive" form={Responsive} name="responsive"/>
        <Section title="Animation" form={Animation} name="animation"/>
        <Section title="Dialog" form={Dialog} name="dialog"/>
        <Section title="Ok Dialog" form={OkDialog} name="okdialog"/>
        <Section title="Yes No Dialog" form={YesNoDialog} name="yesnodialog"/>
    </div>
);
