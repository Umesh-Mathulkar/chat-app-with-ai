'use client'
import Spinner from '@/app/components/Loader/spinner'

const Loading = ()=>{
    <div className="loader-container">
    {/* Apply gradient background to the entire Loader component */}
    <div className="gradient-bg"></div>
    <div className="spinner-wrapper">
      <Spinner />
    </div>
  </div>
}
export default Loading