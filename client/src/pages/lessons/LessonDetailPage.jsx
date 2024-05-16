// import React from 'react'
import { Helmet } from 'react-helmet-async';
import LessonDetailView from './sections/LessonDetailView';

const LessonDetailPage = () => {
  return (
    <>
        <Helmet>
            <title>
                Lesson Detail
            </title>
        </Helmet>
       <LessonDetailView/>
    </>
  )
}

export default LessonDetailPage