import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [file, setFile] = useState(null);
  const navigate=useNavigate();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formdata, setFormData] = useState({});
  const[PublishError,setPublishError]=useState(null);
  console.log(formdata);

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
          setImageUploadProgress(progress.toFixed(0)); // Set progress correctly
        },
        (error) => {
          console.error('Upload Error',error)
          setImageUploadError('Image upload failed'+error.message);
          setImageUploadProgress(null); // Reset progress
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null); // Reset progress
            setImageUploadError(null);
            setFormData({ ...formdata, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload error');
      setImageUploadProgress(null); // Reset progress
      console.log(error);
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Handle the form submission logic here
    try{
      const res=await fetch('/api/post/create',{
        method:'POST',
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
      <h1 className='text-center text-3xl my-7 font font-semibold'> Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>setFormData({...formdata,title:e.target.value})}/>
          <Select onChange={(e)=>setFormData({...formdata,category:e.target.value})}>
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
        <ReactQuill theme='snow' placeholder='Write Something...' className='h-72 mb-12' required onChange={(value)=>{
          setFormData({...formdata,content:value})
        }}/>
        <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        { PublishError&&<Alert className='mt-5' color='failure'>{PublishError}</Alert>}
      </form>
    </div>
  );
}

export default CreatePost;
