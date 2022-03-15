import { useState, useEffect } from 'react';
import './styles.css';
import PostCard from '../../components/PostCard';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(18);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts;

  useEffect(() => {
    async function load() {
      await handleLoadPosts();
    }
    load();
  });

  // CALLBACK THIS.SETSTATE

  // handleClickTeste = () => {

  //   this.setState demora para executar pois o React faz a comparação da nova Virtual DOM com a antiga
  //   porém o código continua executando, então se o console estivesse fora da callback do setState
  //   ele mostraria o valor anterior a nova atualização do valor

  //   this.setState({ counter: counter + 1 }, () => {
  //     console.log(this.state.counter)
  //   })
  // }

  const handleLoadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  };

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;

    // pegando próximos posts no intervalo do slice de allPosts
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);

    // jogando posts pegos no intervalo de allPosts dentro dos posts iniciais
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <input
        type="search"
        onChange={handleSearch}
        value={searchValue}
        className="input-content"
        placeholder="Pesquisar"
      />
      <div className="posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard post={post} key={post.id} />)
        ) : (
          <p>Não há posts para essa pesquisa</p>
        )}
      </div>
      <div className="button-container">
        {!searchValue && <Button text={'Load more'} onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
}

// class Home2 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postPerPage: 18,
//     searchValue: '',
//   }

//   async componentDidMount(){
//     await this.loadPosts()
//   }

//   loadPosts = async () => {
//     const {page, postPerPage} = this.state

//     const postsAndPhotos = await loadPosts()
//     this.setState({
//       posts: postsAndPhotos.slice(page, postPerPage),
//       allPosts: postsAndPhotos,
//     })
//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)

//     posts.push(...nextPosts);

//     this.setState({
//       posts,
//       page: nextPage,
//     })
//   }

//   handleSearch = (e) => {
//     const {value} = e.target;
//     this.setState({searchValue: value})
//   }

//   render(){

//     const {posts, page, postPerPage, allPosts, searchValue} = this.state
//     const noMorePosts = page + postPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//     ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase()))
//     : posts

//     return (
//       <section
//         className="container"
//       >
//         <input
//           type="search"
//           onChange={this.handleSearch}
//           value={searchValue}
//           className="input-content"
//           placeholder="Pesquisar"
//         />
//         <div className="posts">
//           {
//             filteredPosts.length > 0 ?
//               filteredPosts.map(post => (
//                 <PostCard post={post} key={post.id}/>
//               ))
//             : <p>Não há posts para essa pesquisa</p>
//           }
//         </div>
//         <div
//           className="button-container"
//         >
//           {
//             !searchValue &&
//             <Button
//               text={"Load more"}
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           }
//         </div>
//       </section>
//     );
//   }
// }

export default Home;
