import React from 'react';
import { connect } from 'react-redux';

import * as ideaActions from '../actions/ideas';
import * as ideaViewActions from '../actions/ideas-view';

import IdeasView from './ideas-view';
import Shell from '../components/shell';

const mapStateToProps = ({ ideasView }) => ({ ideasView });

const mapDispatchToProps = ({
    onUpsert: ideaActions.upsert,
    onSetSortType: ideaViewActions.setSortType,
    onSetSortDescending: ideaViewActions.setSortDescending,
});

class App extends React.Component {

    handleCreate = () => this.props.onUpsert({ title: '' }, null, true) // TODO: remove empty title

    render() {

        const { ideasView, onSetSortType, onSetSortDescending } = this.props;

        return (
            <Shell
                sortType={ideasView.sortType}
                sortDescending={ideasView.sortDescending}
                sortTypes={ideasView.sortTypes}
                onChangeSortType={onSetSortType}
                onChangeSortDescending={onSetSortDescending}
                onCreateIdea={this.handleCreate}>
                <IdeasView />
            </Shell>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
