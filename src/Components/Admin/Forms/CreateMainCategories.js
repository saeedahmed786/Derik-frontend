import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Error, Success } from "../../Messages/messages";
import Loading from "../../Loading/Loading";

export const CreateMainCategories = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [category, setCategory] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/categories/create`, { name: category }
        , {
          headers: {
            authorization: "Bearer " + localStorage.getItem('token'),
          }
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Success(res.data.successMessage);
          props.updateFunction();
        } else {
          Error(res.data.errorMessage)
        }
      });
  };

  return (
    <div>
      <button className='btn px-4 submit-btn btn-outline-dark rounded-pill' onClick={showModal}>Create Category</button>
      <Modal title="New Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form onSubmit={submitHandler} className="text-center create-posts">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Enter Category Title"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div style={{ marginTop: '15px' }}>
                <button
                  type="submit"
                  size="large"
                  className="btn btn-outline-dark w-25"
                >
                  Submit
                </button>
              </div>
            </form>
        }
      </Modal>
    </div>
  );
};