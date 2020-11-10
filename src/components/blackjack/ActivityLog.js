import React from "react";
import { ActivityItem, mergeStyleSets, Icon, Text, DefaultEffects, } from '@fluentui/react';
import { MotionAnimations } from '@fluentui/theme';

// custom stuff 
import BaseComponent from '../BaseComponent';

// Flux
import ActivityLogStore from './stores/ActivityLogStore';

const classNames = mergeStyleSets({
  divRoot: {
    animation: MotionAnimations.fadeIn,
    backgroundColor: 'ghostwhite',
    borderRadius: DefaultEffects.roundedCorner6,
    boxShadow: DefaultEffects.elevation8,
    color: 'darkslategray',
    marginLeft: '10px',
    maxHeight: '400px',
    maxWidth: '500px',
    overflowY: 'hidden',
    padding: '10px',
  },
  activityItemRoot: {
    animation: MotionAnimations.slideLeftIn,
    marginTop: '10px',
    color: 'darkslategray',
  },
  nameText: {
    fontWeight: 'bold',
    color: 'darkslategray',
  },
  descriptionText: {
    fontWeight: 'normal',
    color: 'darkslategray',
  },
});

class ActivityLog extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      activityItems: [],
      nextKey: 1,
    };

    this._bind('onChangeLog');
  }

  componentDidMount() {
    ActivityLogStore.addChangeListener(this.onChangeLog);
  }

  componentWillUnmount() {
    ActivityLogStore.removeChangeListener(this.onChangeLog);
  }

  onChangeLog() {
    const newState = ActivityLogStore.getState();
    this.setState({ ...newState });
    console.log(`ActivityLog#onChangeLog`);
  }

  render() {
    const activityItems = this.state.activityItems.map(item => (
      <ActivityItem
        activityDescription={[
          <span key={1} className={classNames.nameText}>{item.name}</span>,
          <span key={2} className={classNames.descriptionText}>{item.description}</span>
        ]}
        activityIcon={<Icon iconName={item.iconName} />}
        isCompact
        key={item.key}
        className={classNames.activityItemRoot}
      />
    ));

    return (
      <div className={classNames.divRoot}>
        <Text block nowrap variant="xLarge">Activity Log</Text>
        {activityItems}
      </div>
    );
  }
}

export default ActivityLog;