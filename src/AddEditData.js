import React, { useState } from "react";
import { post, update } from "./api/service";
import ToastMessage from "./components/toastMessage/index";

export default function AddEditData({
  formData,
  setFormData,
  status,
  reload,
  setReload,
}) {
  const [nameMsg, setNameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [descMsg, setDescMsg] = useState("");

  const onChange = (e) => {
    const res = { ...formData };
    res[e.target.name] = e.target.value;
    setFormData(res);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (formData?.name === "") {
      return setNameMsg("Full Name is required");
    }
    if (formData?.email === "") {
      return setEmailMsg("Email is requied");
    }

    if (formData?.description === "") {
      return setDescMsg("Description is required");
    }

    if (status.id) {
      update(status.id, formData)
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            no_phone: "",
            gender: "",
            position: "",
            country: "",
            departmen: "",
            description: "",
          });
          setReload(reload + 1);
          ToastMessage({ message: "Data updated!", type: "success" });
        })
        .catch(() => "");
    } else {
      post(formData)
        .then((res) => {
          setFormData({
            name: "",
            email: "",
            no_phone: "",
            gender: "",
            position: "",
            country: "",
            departmen: "",
            description: "",
          });
          setReload(reload + 1);
          ToastMessage({ message: "Data has been added!", type: "success" });
        })
        .catch(() => "");
    }
  };

  const onCancel = () => {
    setFormData({
      name: "",
      email: "",
      no_phone: "",
      gender: "",
      position: "",
      country: "",
      departmen: "",
      description: "",
    });
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="row section-form">
          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <label className="poppins-font">
                  Full Name{" "}
                  <span className="text-danger" style={{ fontSize: "11px" }}>
                    &#9733;
                  </span>
                </label>
                <input
                  className="form-control form-control-sm"
                  name="name"
                  type="text"
                  placeholder="Enter Full Name"
                  onChange={onChange}
                  value={formData.name}
                />
              </div>
              <div
                className="text-danger poppins-font"
                style={{ fontSize: "12px" }}
              >
                {nameMsg}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <label className="poppins-font">
                  Email{" "}
                  <span className="text-danger" style={{ fontSize: "11px" }}>
                    &#9733;
                  </span>
                </label>
                <input
                  className="form-control form-control-sm"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={onChange}
                  value={formData.email}
                />
              </div>
              <span
                className="text-danger poppins-font"
                style={{ fontSize: "12px" }}
              >
                {`${emailMsg}`}
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <label className="poppins-font">No. Tlp</label>
                <input
                  className="form-control form-control-sm"
                  name="no_phone"
                  type="number"
                  placeholder="Enter No. Phone"
                  onChange={onChange}
                  value={formData.no_phone}
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <label className="poppins-font">Position </label>
                <input
                  className="form-control form-control-sm"
                  name="position"
                  type="text"
                  placeholder="Enter Work Position"
                  onChange={onChange}
                  value={formData.position}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <label className="poppins-font">Country</label>
                <input
                  className="form-control form-control-sm"
                  name="country"
                  type="text"
                  placeholder="Enter Country"
                  onChange={onChange}
                  value={formData.country}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <label className="poppins-font">Department</label>
                <input
                  className="form-control form-control-sm"
                  name="department"
                  type="text"
                  placeholder="Enter Department"
                  onChange={onChange}
                  value={formData.department}
                />
              </div>
            </div>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <label className="poppins-font">
                  Another Description
                  <span className="text-danger" style={{ fontSize: "11px" }}>
                    &#9733;
                  </span>
                </label>
                <textarea
                  className="form-control form-control-sm"
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  onChange={onChange}
                  value={formData.description}
                ></textarea>
              </div>
              <span
                className="text-danger poppins-font"
                style={{ fontSize: "12px" }}
              >
                {`${descMsg}`}
              </span>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="col">
                <label className="poppins-font">
                  Gender{" "}
                  <span className="text-danger" style={{ fontSize: "11px" }}>
                    &#9733;
                  </span>
                </label>
                <select
                  name="gender"
                  onChange={onChange}
                  className="form-select form-select-sm"
                  value={formData.gender}
                >
                  <option value="">Choose Gender</option>
                  <option value="laki_laki">Laki Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-12 px-2 d-flex button-section mt-3">
            <button
              type="reset"
              className="btn me-2 btn-sm btn-secondary"
              style={{ fontSize: "17px" }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm text-white fw-bolder"
              style={{
                backgroundColor: "#3d4fa6",
                fontSize: "17px",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
