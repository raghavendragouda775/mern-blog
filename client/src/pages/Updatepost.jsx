import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function UpdatePost() {
  const [file, setFile] = useState(null);
  const currentUser=useSelector((state)=>state.user.currentUser)
  const navigate=useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formdata, setFormData] = useState({});
  const[PublishError,setPublishError]=useState(null);
  const[showmore,setshowmore]=useState(true);
  const { postId }=useParams();
  useEffect(()=>{
       try{
        const fetchPost=async()=>{
            const res=await fetch(`/api/post/getposts?postId=${postId}`);
            const data=await res.json();
            console.log(data);
            if(!res.ok)
            {
                console.log(data.message);
                setPublishError(data.message)
                return;
            }
            else{
                setPublishError(null);
                setFormData(data.posts[0]);
               
            }

        }
          fetchPost();
       }catch(error)
       {
        console.log(error);
       }
  },[postId])

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.error('Upload Error',error)
          setImageUploadError('Image upload failed'+error.message);
          setImageUploadProgress(null); 
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null); 
            setImageUploadError(null);
            setFormData({ ...formdata, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload error');
      setImageUploadProgress(null); 
      console.log(error);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault(); 
    try{
      const res=await fetch(`/api/post/updatepost/${formdata._id}/${currentUser._id}`,{
        method:'PUT',
        credentials:'include',
        headers:{'Content-Type':'application/json',
        },
        body:JSON.stringify(formdata)
      })
      const data=await res.json();
      if(!res.ok)
      {
        setPublishError(data.message)
        return;
      }
      else
      {
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
      
    }catch(error)
    {
      setPublishError('something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font font-semibold'> Update a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>setFormData({...formdata,title:e.target.value})} value={formdata.title}/>
          <Select onChange={(e)=>setFormData({...formdata,category:e.target.value})} value={formdata.category}>
            <option value="Uncategorized">Select a category</option>
            <option value="JavaScript">JavaScript</option>
            <option value="ReactJS">ReactJS</option>
            <option value="NextJS">NextJS</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress !== null}>
            {imageUploadProgress !== null ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
        )}
        {formdata.image && (
          <img src={formdata.image} alt='upload' className='w-full h-72 object-cover' />
        )}
        <ReactQuill theme='snow' value={formdata.content} placeholder='Write Something...' className='h-72 mb-12' required onChange={(value)=>{
          setFormData({...formdata,content:value})
        }}/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update Post</Button>
        { PublishError&&<Alert className='mt-5' color='failure'>{PublishError}</Alert>}
      </form>
    </div>
  );
}

export default UpdatePost;
