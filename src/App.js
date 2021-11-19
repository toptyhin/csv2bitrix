import React, {useMemo, useState} from 'react';
import {Layout, Empty, Button} from 'antd';
import './App.css';
import {useDropzone} from 'react-dropzone';

import { readString } from 'react-papaparse'



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  position: 'absolute',
  width: '100%',
  opacity: '0.1',
  left: '0px',
  right: '0px',
  height: '200px',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function StyledDropzone(props) {
  
  const {readData, setReadData} = useState(false);
  const {fileInfo, setFileInfo} = useState({
    name:false,
    size:false
  });
  
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'text/csv'});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const files = useMemo(()=>{
    acceptedFiles.map(file => {
      const reader = new FileReader();
      reader.readAsText(file)
      reader.onload = () =>{
        const result = readString(reader.result);
        !result.errors.length && setReadData(true) && setFileInfo({
          name: file.path,
          size: file.size
        })
      }    
      // return (
      //   <li key={file.path}>
      //     {file.path} - {file.size} bytes
      //   </li>
      // )
    }
  )
  },[acceptedFiles,setFileInfo,setReadData]);

  // const files = acceptedFiles.map(file => {
  //     const reader = new FileReader();
  //     reader.readAsText(file)
  //     reader.onload = () =>{
  //       console.log(readString(reader.result))
  //     }    
  //     return (
  //       <li key={file.path}>
  //         {file.path} - {file.size} bytes
  //       </li>
  //     )
  //   }
  // );


  
  // acceptedFiles.map( (file) => {
  //     const reader = new FileReader();
  //     reader.readAsText(file)
  //     reader.onload = () =>{
  //       console.log(readString(reader.result))
  //     }
      
  //   }
  // )

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
      </div>
      <aside>
        <Empty
            description={<span>ДрагЕнДроп йоур фаилс хере</span>}
        />
        { fileInfo.size && (
          <>
            <h4>Файл</h4>  
            <ul>
              <li key={fileInfo.name}>{fileInfo.name} - {fileInfo.size} bytes</li>
            </ul>
          </>
        )

        }

      </aside>      
    </div>
  );
}

const { Header, Footer, Content } = Layout;

function App() {

  const {dataRead, setDataRead} = useState(false)

  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <div className="App">
        <StyledDropzone 
          handleData = {setDataRead}
        />
        {/* <Empty
            description={<span>ДрагЕнДроп йоур фаилс хере</span>}
        /> */}
        
      </div>        
      </Content>
      <Footer>
      <Button type="primary">Отправить</Button>
      </Footer>
    </Layout>



  );
}

export default App;
