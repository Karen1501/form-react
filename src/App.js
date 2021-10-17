import React, { useState } from "react";

const FieldInput = ({ indexParent, placeholder, name, value, onChange }) => (
  <div className="w-full  mx-2">
    <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(event) => onChange(indexParent, event)}
        className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
      />
    </div>
  </div>
);

const App = () => {
  const defaultFields = {
    nombre: "",
    email: "",
    telefono: "",
  };

  const dataToAdd = {
    edad: "",
    hobbies: "",
    ocupacion: "",
  };

  const [data, setData] = useState([defaultFields]);
  const [fieldToAdd, setFieldToAdd] = useState([dataToAdd]);

  // Usar index para eliminar imputs definidos
  const onDelete = (indexToDelete) => {
    const newFields = data.filter((d, index) => index !== indexToDelete);
    setData([...newFields]);
  };

  // Usar index para eliminar imputs agregados
  const onDeleteExtraField = (indexDelte) => {
    const extraFields = fieldToAdd.filter((d, index) => index !== indexDelte);
    setFieldToAdd([...extraFields]);
  };

  // agregar campos para otro usuario
  const onAdd = () => {
    setData([...data, { ...defaultFields }]);
  };

  // agregar campos extra
  const onAddField = () => {
    setFieldToAdd([...fieldToAdd, { ...dataToAdd }]);
    console.log("fieldToAdd:", fieldToAdd);
  };

  const onChange = (indexParent, event) => {
    const newData = data.map((d, index) => {
      if (index === indexParent) {
        d[event.target.name] = event.target.value;
      }

      return d;
    });

    setData([...newData]);
  };

  return (
    <div className="container flex-justify-center">
      <div className="row">
        <div className="col">
          <p>Campos que se pueden agregar</p>
          <div className="col">
            <ul>
              <li>Edad</li>
              <li>Hobbies</li>
              <li>Ocupación</li>
            </ul>
          </div>
        </div>

        <div className="col">
          <p>Datos de contacto</p>
          <div>
            <button
              onClick={onAdd}
              type="button"
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-dark py-1 px-5 rounded focus:outline-none focus:shadow-outline"
            >
              Agregar usuario
            </button>
            <div className=" border-b border-gray-200">
              <div className="flex flex-col md:flex-row">
                {data.map((d, index) => {
                  return (
                    <>
                      <div key={`field-${index}`}>
                        <div>
                          <FieldInput
                            indexParent={index}
                            placeholder="Nombre"
                            name="nombre"
                            value={d.nombre}
                            onChange={onChange}
                          />
                        </div>
                        <FieldInput
                          indexParent={index}
                          placeholder="Email"
                          name="email"
                          value={d.email}
                          onChange={onChange}
                        />
                        <FieldInput
                          indexParent={index}
                          placeholder="Teléfono"
                          name="telefono"
                          value={d.telefono}
                          onChange={onChange}
                        />
                      </div>

                      <div className="w-full mx-2 flex items-center justify-center">
                        <button
                          onClick={() => onDelete(index)}
                          type="button"
                          className="text-sm bg-red-500 hover:bg-red-700 text-dark py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Eliminar
                        </button>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div>
            <p>Campos que se pueden agregar</p>
            <button
              onClick={onAddField}
              type="button"
              className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-dark py-1 px-5 rounded focus:outline-none focus:shadow-outline"
            >
              Add Fields
            </button>

            <div className="col col-md-4">
              {fieldToAdd.map((f, index) => {
                return (
                  <>
                    <FieldInput
                      indexParent={index}
                      placeholder="Edad"
                      name="nombre"
                      value={f.edad}
                      onChange={onChange}
                    />
                    <FieldInput
                      indexParent={index}
                      placeholder="Hobbies"
                      name="hobbies"
                      value={f.hobbies}
                      onChange={onChange}
                    />
                    <FieldInput
                      indexParent={index}
                      placeholder="Ocupación"
                      name="ocupacion"
                      value={f.ocupacion}
                      onChange={onChange}
                    />
                    <button
                      onClick={() => onDeleteExtraField(index)}
                      type="button"
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-dark py-1 px-5 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete Fields
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
