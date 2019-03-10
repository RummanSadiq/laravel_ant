import React, { Component } from "react";
import {
    Col,
    Card,
    Table,
    Tag,
    Divider,
    Button,
    Input,
    InputNumber,
    Popconfirm,
    Form,
    Upload
} from "antd";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        // if (this.props.inputType === "number") {
        //     return <InputNumber />;
        // }
        // if (this.props.inputType === "file") {
        //     return <Upload />;
        // }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {form => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `Please Input ${title}!`
                                            }
                                        ],
                                        initialValue: record[dataIndex]
                                    })(<Input/>)}
                                </FormItem>
                            ) : (
                                restProps.children
                            )}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class ViewProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {  editingKey: '' };


        this.columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description"
            },
            // {
            //     title: "Picture",
            //     dataIndex: "display_picture",
            //     key: "picture",
            //     render: Image => <img src={Image} />
            // },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Category",
                dataIndex: "category_id",
                key: "category"
            },

            {
                title: "Action",
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() =>
                                                    this.save(form, record.key)
                                                }
                                                style={{ marginRight: 8 }}
                                            >
                                                Save
                                            </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() =>
                                            this.cancel(record.key)
                                        }
                                    >
                                        <a>Cancel</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                <a onClick={() => this.edit(record.key)}>
                                    Edit
                                </a>
                            )}
                        </div>
                    );
                }
            }
        ];
    }

    state = {
        products: [],
        visible: false,
    };

    componentDidMount() {
        axios.get("/api/products").then(res => {
            const productsData = res.data;
            console.log(productsData);
            this.setState({ products: productsData });
        });
    }

  

    isEditing = (record) => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: "" });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.products];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({ products: newData, editingKey: "" });
            } else {
                newData.push(row);
                this.setState({ products: newData, editingKey: "" });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
        console.log("Key editing is",key)
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
              console.log("NOT EDITABLE");  
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            };
        });

        return (
            <div>
                <Col span={14} offset={6}>
                    <div>
                        <h1 style={{ textAlign: "center" }}>
                            These are all the products you have listed.
                        </h1>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={this.state.products}
                        components={components}
                        rowClassName="editable-row"
                    />
                </Col>
            </div>
        );
    }
}

export default ViewProducts;
