import React,{useEffect,useState,ChangeEvent,useCallback} from 'react';
import {apiGetList,listResult} from '@/servers/list';
import useDebounce from '@/hook/useDebounce'
import './index.less'
function Serch() {
  const [userList,setUserList] = useState<listResult>({qq:'',name:'',qlogo:''});
  const [value,setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500)
  const list = async (value:string) => {
    try {
      const data:any = await apiGetList({ qq:value });
      setUserList({qq:data?.qq,name:data?.name,qlogo:data?.qlogo});
    } catch (error) {
      // dosomethings
    }
  }
  useEffect(() =>{
    list('');
  },[])
  const changeList=useCallback((event: ChangeEvent<HTMLInputElement>)=>{
   setValue(event.target.value);
  },[event])
  useEffect(() => {
    list(value);
  }, [debouncedValue])
  //测试用例
  return (
    <div className="wraper">
      <input type="text" className="wraper-input" onChange={changeList}/>
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
    </div>
  )
}
export default Serch;