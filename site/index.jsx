import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import { Row, Col, Icon, Input, Button } from 'antd';

import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

const appStore = observable({
  src: '',
  dest: ''
});

appStore.toPinyin = function() {
  let _this = this; 
  const url = 'http://localhost:3000/pinyin/' + this.src;
  const xhr = new XMLHttpRequest;
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function(){
    if (4 == xhr.readyState) {
      console.log(xhr.responseText);
      _this.dest = xhr.responseText;
    }
  };
  xhr.send();
}

appStore.onSrcChanged = function(e) {
  this.src = e.target.value;
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.toPinyin = this.toPinyin.bind(this);
  }

  onChange(e) {
    this.props.store.onSrcChanged(e);
  }

  toPinyin(e) {
    e.preventDefault();
    this.props.store.toPinyin();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6} />
          <Col span={12} >
            <div style={{marginTop:50, textAlign:'center', fontSize:20}} >基于ICU实现的Nodejs拼音转换模块</div>
            <div style={{marginTop:200}} />
            <Col span={10} >
              <div>汉字</div>
              <Input type="textarea" rows={4} onChange={ this.onChange } 
              onPressEnter={ this.toPinyin } />
            </Col>
            <Col span={4}>
              <Button style={{marginTop:40, marginLeft:40}} type="ghost" shape="circle-outline" icon="arrow-right"
              onClick={ this.toPinyin } />
            </Col>
            <Col span={10} >
              <div>拼音</div>
              <Input type="textarea" rows={4} disabled={true} value={this.props.store.dest} />
            </Col>            
          </Col>
          <Col span={6} />
        </Row>
      </div>
    );
  }
}
const ObservableApp = observer(App);


ReactDOM.render(<ObservableApp store={appStore} />, document.body);