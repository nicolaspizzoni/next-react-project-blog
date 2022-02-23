import {Component} from 'react'
import './styles.css';
import PostCard from '../../components/PostCard';
import {loadPosts} from '../../utils/load-posts'
import { Button } from '../../components/Button';

class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 18,
    searchValue: '',
  }

  async componentDidMount(){
    await this.loadPosts()
  }

  loadPosts = async () => {
    const {page, postPerPage} = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)

    posts.push(...nextPosts);

    this.setState({
      posts,
      page: nextPage,
    })
  }

  handleSearch = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value})
  }

  render(){

    const {posts, page, postPerPage, allPosts, searchValue} = this.state
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
    ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts

    return (
      <section
        className="container"
      >
        <input 
          type="search"
          onChange={this.handleSearch}
          value={searchValue}
          className="input-content"
          placeholder="Pesquisar"
        />
        <div className="posts">
          {
            filteredPosts.length > 0 ?
              filteredPosts.map(post => (
                <PostCard post={post} key={post.id}/>
              ))
            : <p>Não há posts para essa pesquisa</p>
          }
        </div>
        <div
          className="button-container"
        >
          {
            !searchValue &&
            <Button 
              text={"Load more"}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          }
        </div>
      </section>
    );
  }
}

export default Home;
