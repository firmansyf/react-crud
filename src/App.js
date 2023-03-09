import "./App.css";
import React, { lazy, useEffect, useState } from "react";
import { deleteData, getData } from "./api/service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMagnifyingGlass,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Linkify from "linkify-react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import ToastMessage from "./components/toastMessage/index";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Swal from "sweetalert2";

const AddEditData = lazy(() => import("./AddEditData"));

export default function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ id: null, isStatus: false });
  const [reload, setReload] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    no_phone: "",
    gender: "",
    country: "",
    departmen: "",
    description: "",
  });

  useEffect(() => {
    getData()
      .then(({ data: res }) => {
        setData(res);
      })
      .catch(() => "");
  }, [reload]);

  const onEdit = (id) => {
    let res = [...data];
    const value = res.find((item) => item.id === id);
    setFormData({
      name: value.name,
      email: value.email,
      position: value.position,
      no_phone: value.no_phone,
      gender: value.gender,
      country: value.country,
      departmen: value.department,
      description: value.description,
    });
    setStatus({ id: id, status: true });
  };

  const onDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id)
          .then((res) => {
            ToastMessage({
              type: "success",
              message: "Data has been deleted!",
            });
            setReload(reload + 1);
          })
          .catch(() => {});
      }
    });
  };

  const linkProps = {
    onClick: (e) => {
      e.preventDefault();
      window.open(e?.target?.href, "_blank");
    },
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="mt-5 px-3 text-muted poppins-font">
            <h2>Form Add Data </h2>
          </div>
          <div className="form mt-3">
            <AddEditData
              formData={formData}
              setFormData={setFormData}
              status={status}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </div>
        <div className="col">
          <div className="section-content">
            <div
              className="hedear-title sticky-top text-uppercase"
              style={{ backgroundColor: "#3D4FA6" }}
            >
              <span className="">Data Crucial Employee at </span>
              <p>Cikopalo Startup</p>
            </div>
            <div className="">
              <div className="search-box mt-3 mx-2 px-2 input-group input-group-solid">
                <input
                  type="text"
                  placeholder="Seacrh Employee..."
                  name="search"
                  className="input-search"
                  onChange={({ target }) => setKeyword(target?.value)}
                />
                <div className="ms-3">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-muted"
                  />
                </div>
              </div>
              {Array.isArray(data) &&
                data
                  ?.slice(0)
                  ?.filter((item) => {
                    return keyword?.toLowerCase() === ""
                      ? item
                      : item?.name?.toLowerCase().includes(keyword);
                  })
                  ?.map(
                    (
                      {
                        id,
                        name,
                        description,
                        email,
                        no_phone,
                        position,
                        gender,
                      },
                      index
                    ) => {
                      return (
                        <>
                          <section
                            key={index}
                            className="mt-3 px-3 d-flex justify-content-between section-data"
                            style={{ backgroundColor: "#fff", height: 45 }}
                          >
                            <div className="d-flex">
                              <span className="text-muted me-2">
                                {index + 1}.
                              </span>
                              <div className="d-flex align-items-center shantell-font">
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="me-2 text-secondary cursor-pointer"
                                />
                                <span>{name}, </span>
                                <div
                                  className="mx-2 text-muted"
                                  style={{ fontSize: "12px" }}
                                >
                                  <Linkify options={{ attributes: linkProps }}>
                                    {description}
                                  </Linkify>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Edit</Tooltip>}
                              >
                                <FontAwesomeIcon
                                  icon={faPen}
                                  className="me-2 text-primary cursor-pointer fw-bolder"
                                  onClick={() => onEdit(id)}
                                />
                              </OverlayTrigger>

                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="text-danger cursor-pointer fw-bolder"
                                  onClick={() => onDelete(id)}
                                />
                              </OverlayTrigger>
                            </div>
                          </section>
                        </>
                      );
                    }
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
