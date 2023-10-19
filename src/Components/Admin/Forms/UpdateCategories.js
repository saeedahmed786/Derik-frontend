import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Error, Success } from "../../Messages/messages";
import Loading from "../../Loading/Loading";


export const UpdateCategories = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    console.log('object')
    e.preventDefault();
    setLoading(true);
    axios.put(`/api/categories/update/${props.catId}`, { name }, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Success(res.data.successMessage);
          props.updateFunction();
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  useEffect(() => {
    setName(props.name);

    return () => {

    }
  }, [])



  return (
    <div>
      <a onClick={showModal}><EditOutlined /></a>
      <Modal title="Update Category" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form className="text-center create-posts">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={name}
                  placeholder="Enter Sub Category Title"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ marginTop: '15px' }}>
                <button
                  onClick={submitHandler}
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