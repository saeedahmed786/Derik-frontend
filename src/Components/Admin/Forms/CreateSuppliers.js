import React, { useState } from "react";
import axios from "axios";
import Modal from "antd/lib/modal/Modal";
import { Error, Success } from "../../Messages/messages";
import Loading from "../../Loading/Loading";

export const CreateSellers = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [debt, setDebt] = useState('');
  const [paid, setPaid] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /************************************************ Submit **********************************************/
  const submitHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/Sellers/create`, { firstName, lastName, phone, debt, paid }
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
      <button className='btn px-4 submit-btn btn-outline-dark rounded-pill' onClick={showModal}>Create Seller</button>
      <Modal destroyOnClose title="New Seller" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form onSubmit={submitHandler} className="text-center create-posts">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Enter Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mt-4"
                  placeholder="Enter Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mt-4"
                  placeholder="Enter Debt"
                  onChange={(e) => setDebt(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Enter Paid Amount"
                  onChange={(e) => setPaid(e.target.value)}
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