import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchNews } from '../actions/newsActions';
import Search from '../components/Search';
import { searchNewsSelector } from '../selectors/newsSelectors';
import { addBookmark } from '../actions/bookmarkActions';

const mapStateToProps = state => ({
    filteredNews: searchNewsSelector(state)
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        searchNews,
        addBookmark
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps) (Search)