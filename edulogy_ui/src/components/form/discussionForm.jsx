import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextError from '../textError';
import { IoIosClose } from "react-icons/io";
import { MdCameraAlt } from "react-icons/md";
import axios from 'axios';
import { useMutation } from 'react-query';
import { RotateCircleLoading } from 'react-loadingg';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object({
  title: Yup.string().required('Không được bỏ trống tiêu đề'),
  content: Yup.string().required('Không được bỏ trống nội dung')
});

const DiscussionForm = React.forwardRef(({ refetch }, ref) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const user = useSelector(store => store.authentication.user);

  const initialValues = {
    title: '',
    content: ''
  };

  const mutation = useMutation(async ({ formValues, resetForm }) => {
    const images = await getImagesUrl();

    const config = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }
    }

    const data = {
      title: formValues.title,
      content: formValues.content,
      imgs: images
    }

    await axios.post('http://localhost:3000/api/problems', data, config);

    console.log('Thanh cong');
    setSelectedImages([]);
    resetForm();
    refetch();
  });

  const getImagesUrl = async () => {
    let imagesUrl = [];

    for (const image of selectedImages) {
      var form = new FormData();
      form.append('key', '92375a8cb3c4edce26332a38805e6251');
      form.append('image', image);

      const response = await axios.post('https://api.imgbb.com/1/upload', form);
      imagesUrl.push(response.data.data.image.url);
    }

    return imagesUrl;
  }

  const onSubmit = (values, { resetForm, setFieldError }) => {
    if (!user) {
      setFieldError('content', 'Vui lòng đăng nhập để sử dụng tính năng này');
    } else {
      mutation.mutate({ formValues: values, resetForm });
    }
  }

  const handleImagesChoose = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const expectedImages = [...selectedImages].concat(fileArray);
      setSelectedImages(expectedImages);
    }
  }

  const handleRemoveImageClick = (image) => {
    const expectedImages = selectedImages.filter(img => img !== image);
    setSelectedImages(expectedImages);
  }

  const handleCancelClick = (resetForm) => {
    resetForm();
    setSelectedImages([]);
  }

  return (
    <div className="discussion-posting-area" ref={ref}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
      >
        {formik => {
          return (
            <Form className="discussion-posting-wrapper">
              <h3>Đặt câu hỏi</h3>
              <div className="input-control">
                <label htmlFor="title">Tiêu đề</label>
                <Field type="text" id="title" name="title" />
                <ErrorMessage name="title" component={TextError} />
              </div>

              <div className="input-control">
                <label htmlFor="content">Nội dung</label>
                <Field as="textarea" id="content" name="content" />
                <ErrorMessage name="content" component={TextError} />
                <input type="file" multiple name="image" id="image" accept="image/*" onChange={handleImagesChoose} />
                <label htmlFor="image" className="image-upload">
                  <MdCameraAlt className="image-upload-icon" />
                </label>
                <div className="uploaded-images-area">
                  {selectedImages.map((image) => (
                    <span key={image.name} className="uploaded-img">
                      <span className="img-name">{image.name}</span>
                      <IoIosClose className="remove-img-icon" onClick={() => handleRemoveImageClick(image)} />
                    </span>
                  ))}
                </div>
              </div>

              <div className="btn-group">
                <button type="button" className="clear-btn" id="clear-btn" onClick={() => handleCancelClick(formik.resetForm)}>Hủy</button>
                <button type="submit" className="submit-btn">Gửi</button>
              </div>

              {mutation.isLoading && <div className="loading-overlay">
                <RotateCircleLoading color='#00949e' />
              </div>}

              {mutation.isError && <div className="error-overlay">Đã xảy ra lỗi!</div>}
            </Form>
          )
        }}
      </Formik>
    </div>
  );
});

export default DiscussionForm;