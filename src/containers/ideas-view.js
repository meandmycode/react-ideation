import React from 'react';
import { connect } from 'react-redux';

import { SORT_FIELD_CREATED_AT, SORT_FIELD_TITLE } from '../constants/sort-types';

import * as ideaActions from '../actions/ideas';

import IdeasListing from '../components/ideas-listing';
import Idea from '../components/idea';

const invertComparer = fn => (a, b) => fn(b, a);

const createdAtComparer = (a, b) => a.item.createdAt - b.item.createdAt;
const titleComparer = (a, b) => a.item.title.localeCompare(b.item.title, undefined, { numeric: true, sensitivity: 'base' });

const comparers = new Map([
    [SORT_FIELD_CREATED_AT, createdAtComparer],
    [SORT_FIELD_TITLE, titleComparer],
]);

const mapStateToProps = ({ ideas, ideasView }) => ({ ideas, ideasView });

const mapDispatchToProps = ({
    onList: ideaActions.list,
    onUpsert: ideaActions.upsert,
    onRemove: ideaActions.remove,
});

export class IdeasView extends React.Component {

    handleChanging = entity => idea => this.props.onUpsert(idea, entity)
    handleChanged = entity => idea => this.props.onUpsert(idea, entity, true)
    handleRemoved = entity => () => this.props.onRemove(entity, true)

    componentDidMount() {
        this.props.onList();
    }

    render() {

        const { ideas, ideasView } = this.props;
        const { sortType, sortDescending } = ideasView;

        const comparer = comparers.get(sortType);
        const sorted = ideas.slice(0).sort(sortDescending ? invertComparer(comparer) : comparer);

        return (
            <IdeasListing>
                {sorted.map(entity => (
                    <Idea
                        key={entity.ephemeral}
                        idea={entity.item}
                        issue={entity.error}
                        autofocus={entity.key == null}
                        hidden={entity.removed}
                        onChanging={this.handleChanging(entity)}
                        onChanged={this.handleChanged(entity)}
                        onRemove={this.handleRemoved(entity)}
                    />
                ))}
            </IdeasListing>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasView);
