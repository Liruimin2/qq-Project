import React,{useEffect,useState,ChangeEvent,useCallback} from 'react';
import {apiGetList,listResult} from '@/servers/list';
import useDebounce from '@/hook/useDebounce';
import {qqIsRight} from '@/utils/rexp';
import Eloading from 'react-loading-dev'
import './index.less'
function Serch() {
  const [userList,setUserList] = useState<listResult>({qq:'',name:'',qlogo:''});
  const [value,setValue] = useState<string>('');
  const [rexpResult,setRespResult] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);
  const [loading,setLoading] = useState<boolean>(true)
  const list = async (value:string) => {
    setLoading(true)
    try {
      const data:any = await apiGetList({ qq:value });
      if(data)setLoading(false)
      setUserList({qq:data?.qq,name:data?.name,qlogo:data?.qlogo});
    } catch (error) {
      // dosomethings
    }
  }
  const changeList=useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    const result = qqIsRight(event.target.value);
    setValue(event.target.value);
    if(result){
      setRespResult(true)
    }else{
      setRespResult(false)
    }
  },[event])
  useEffect(() => {
    list(value);
  }, [debouncedValue])
  //测试用例
  return (
    <div className="wraper">
      <input type="text" className="wraper-input" onChange={changeList}/>
        <span>{rexpResult==false?'请输入正确的qq号码':''}</span>
        <div className={value?"wraper-content":"noneStyle"}>
          <img className="wraper-content-fl" src={userList?.qlogo} alt="" />
          <div className="wraper-content-fr">
            <p className="wraper-content-fr-top">
              {userList?.name}
            </p>
            <p className="wraper-content-fr-top">
              {userList?.qq}
            </p>
          </div>
        </div>
       <div style={{display:loading?'block':'none'}}>
        <Eloading name={'rect'} bgColor={'#1abc9c'} preview={'#fff'}/>
       </div>
    </div>
  )
}
export default Serch;