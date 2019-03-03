import React, { Component } from 'react';
import {Col, Card, Table, Tag, Divider} from 'antd';
import axios from "axios";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: 'Picture',
    dataIndex: 'display_picture',
    key: 'picture',
  },{
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },{
    title: 'Category',
    dataIndex: 'category_id',
    key: 'category',
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = 'geekblue';
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
        })}
      </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: () => (
      <span>
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }];
  
  const data = [{
    key: '1',
    name: 'Sweat Shirt',
    description: 'This is a SweatShirt',
    display_picture: 'image here',
    price: '$25',
    category: 'Category',
    tags: ['nice', 'developer'],
  }];


class ViewProducts extends Component {
    state = { 
      product:[
      ]
     }
     componentDidMount() {
        axios.get("/api/products").then(res => {
            const data = res.data;
            this.setState({ product: data });
        });
    }
    render() { 
        return (  
            <div>
                <Col span={14} offset={6}>
                <div>
                    <h1 style={{textAlign:'center'}}>
                        These are all the products you have listed.
                    </h1>
                </div>
                
                <Table columns={columns} dataSource={this.state.product} />
                
                </Col>

            </div>
        );
    }
}
 
export default ViewProducts;