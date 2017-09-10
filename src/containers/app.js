import React from 'react';
import { connect } from 'react-redux';

import * as ideaActions from '../actions/ideas';
import * as ideaViewActions from '../actions/ideas-view';

import IdeasView from './ideas-view';
import Shell from '../components/shell';

const createRandomKey = () => Math.random().toString(16);

const mapStateToProps = ({ ideasView }) => ({ ideasView });

const mapDispatchToProps = ({
    onCreate: ideaActions.create,
    onSetSortType: ideaViewActions.setSortType,
    onSetSortDescending: ideaViewActions.setSortDescending,
});

class App extends React.Component {

    handleCreate = () => this.props.onCreate({ title: '' }, createRandomKey(), true) // TODO: remove empty title

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
