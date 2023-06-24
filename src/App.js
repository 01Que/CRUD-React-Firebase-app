import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection,addDoc, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  //create movies state
  const [movieList, setMovieList] = useState([]);

  //create new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [receivedOscar, setReceivedOscar] = useState(false);

  //create updated title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  //create file upload state
  const [fileUpload, setFileUpload] = useState(null);

  //define movie list(collection)
  const movieCollectionRef = collection(db, 'movies');

  //READ all movies
  const getMovieList = async() =>{
    try{
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) =>({
        ...doc.data(),
        id: doc.id
      })); 
      setMovieList(filteredData);
    }catch(err){
      console.error(err);
    }
  }

  //render movies immediately after page refreshed
  useEffect(() =>{
    getMovieList();
  }, []);

  //CREATE new movie
  const createMovieHandler = async() =>{

    try{
      await addDoc(movieCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      oscar: receivedOscar,
      userId: auth?.currentUser?.uid //question mark is for incase there's no user logged in
      });

      getMovieList();
    }catch(err){
      console.error(err);
    }  
  };

  //DELETE existing movie
  const deleteMovieHandler = async(id) =>{
    const movieDoc = doc(db, "movies", id);
    try{
      await deleteDoc(movieDoc);
      getMovieList();
    }catch(err){
      console.error(err);
    }   
  };

  //UPDATE existing movie's title
  const updateMovieTitleHandle = async(id) =>{
    const movieDoc = doc(db, "movies", id);
    try{
      await updateDoc(movieDoc, {title: updatedTitle});
      getMovieList();
    }catch(err){
      console.error(err);
    }   
  };

  //uploading file
  const fileUploadHandle = async() =>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `files/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(err){
      console.error(err);
    }
  }

  //render everything
  //change the below code and use different components for each CREATE and UPDATE&DELETE feature
  return (
    <div className="App">

      <Auth />

      <div>
        <input placeholder='movie title...' onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder='release date...' onChange={(e) => setNewReleaseDate(Number(e.target.value))} type='number'/>
        <input type='checkbox' checked={receivedOscar} onChange={(e) => setReceivedOscar(e.target.checked)}/>
        <label>received oscar</label>
        <button onClick={createMovieHandler}>create movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.oscar? "green": "red"}}>title: {movie.title}</h1>
            <p>release date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovieHandler(movie.id)}>delete movie</button>
            <input placeholder='update title' onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateMovieTitleHandle(movie.id)}>update movie title</button>
          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={fileUploadHandle}> upload file</button>
      </div>
    </div>
  );
}

export default App;
