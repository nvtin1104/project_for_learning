// import React from 'react'
import { Helmet } from 'react-helmet-async';
import TopicView from './sections/TopicView';

const TopicPage = () => {
  return (
    <>
        <Helmet>
            <title>
                Topic Page
            </title>
        </Helmet>
       <TopicView/>
    </>
  )
}

export default TopicPage