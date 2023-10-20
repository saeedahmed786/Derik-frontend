import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import { Error, Success } from "../../Messages/messages";
import Loading from "../../Loading/Loading";


export const UpdateSuppliers = ({ supplier, updateFunction }) => {
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
    console.log('object')
    e.preventDefault();
    setLoading(true);
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/suppliers/update/${supplier?._id}`, { firstName, lastName, phone, debt, paid }, {
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Success(res.data.successMessage);
          updateFunction();
        } else {
          Error(res.data.errorMessage);
        }
      });
  };

  useEffect(() => {
    setFirstName(supplier.first_name);
    setLastName(supplier.last_name);
    setPhone(supplier.phone);
    setDebt(supplier.debt);
    setPaid(supplier.paid);

    return () => { 

    }
  }, [])



  return (
    <div>
      <a onClick={showModal} className="text-dark"><EditOutlined /></a>
      <Modal title="Update Supplier" footer={false} visible={isModalVisible} onCancel={handleCancel}>
        {
          loading ?
            <Loading />
            :
            <form className="text-center create-posts">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mt-4"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mt-4"
                  placeholder="Enter Debt"
                  value={debt}
                  onChange={(e) => setDebt(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mt-4"
                  placeholder="Enter Paid Amount"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
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