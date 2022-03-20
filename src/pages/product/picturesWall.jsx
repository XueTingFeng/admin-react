import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { reqDeleteImg } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
export default class  PicturesWall extends Component {

    static propTypes = {
      imgs: PropsTypes.array
    }

    constructor(props){
      super(props)

      let fileList = []

      const {imgs} = this.props
      if(imgs && imgs.length >0){
        fileList = imgs.map((img,index) => ({
          uid:-index,
          name:img,
          status:'done',
          url: BASE_IMG_URL + img
        }))
      }

      this.state = {
        previewVisible: false,//标识是否显示大图预览
        previewImage: '',//大图的url
       // previewTitle: '',
        fileList,
      }
    }

    state = {
      previewVisible: false, // 标识是否显示大图预览Modal
      previewImage: '', // 大图的url
      fileList: [
        /*{
          uid: '-1', // 每个file都有自己唯一的id
          name: 'xxx.png', // 图片文件名
          status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
        },*/
      ],
    }
    
      handleCancel = () => this.setState({ previewVisible: false });
    
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        console.log('handlePreview',file)
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    
      handleChange = async({ file , fileList }) => {
        console.log('handleChange',file ,fileList)
        //上传成功，将当前上传的file的信息修正(name.url)
        if(file.status === 'done'){
          const res = file.response
          if(res.status === 0){
            message.success('上传图片成功')
            const {name,url} = res.data
            file = fileList[fileList.length - 1]
            file.name = name
            file.url = url
          }else{
            message.error('上传图片失败')
          }
        }else if(file.status === 'removed'){//删除图片
          const res = await reqDeleteImg(file.name)
          if(res.status === 0){
            message.success('删除图片成功')
          }else{
            message.error('删除图片失败')
          }
        }

        this.setState({ fileList });
      }

      //获取所有已上传图片文件名的数组
      getImgs = () => {
        return this.state.fileList.map(file => file.name)
      }
    
      render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (
          <>
            <Upload
              action="/manage/img/upload"
              accept='image/*'
              name='image'
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              // title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </>
        );
      }
    }
