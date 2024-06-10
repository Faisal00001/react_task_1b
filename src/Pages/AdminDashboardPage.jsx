import { useCallback, useEffect, useState } from "react";
import SnackBar from "../components/SnackBar";
import { AuthContext } from "../Provider/AuthContext";
import React from "react";
import DragAndDropContext from "../components/DragAndDropContext";
import DraggableRow from "../components/DraggableRow";
const AdminDashboardPage = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { dispatch } = React.useContext(AuthContext);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        // Redirect user to login page or any other desired action after logout
    };
    useEffect(() => {
        fetchVideos();
    }, [currentPage]);
    console.log(videos)
    const fetchVideos = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    payload: {},
                    page: currentPage,
                    limit: 10
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }

            const data = await response.json();
            setVideos(data.list);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const moveRow = useCallback((dragIndex, hoverIndex) => {
        const dragRecord = videos[dragIndex];
        const updatedVideos = [...videos];
        updatedVideos.splice(dragIndex, 1);
        updatedVideos.splice(hoverIndex, 0, dragRecord);
        setVideos(updatedVideos);
    }, [videos]);
    return (
        <DragAndDropContext>
            <>
                <div className="w-full h-full bg-black">
                    <div className="container mx-auto pt-10">
                        <div className="flex justify-between">
                            <h3 className="text-4xl font-bold text-white">App</h3>
                            <button onClick={handleLogout} className="text-black text-base bg-lime-500 px-6 py-2 rounded-full">LogOut</button>
                        </div>
                        <div className="flex justify-between mt-16">
                            <h3 className="text-4xl text-slate-400 font-light">Today’s leaderboard</h3>
                            <div className="bg-slate-900 px-5 py-3 rounded ">
                                <span className="text-slate-400 mr-4">30 May 2022</span>
                                <span className="bg-lime-500 px-2 py-1 rounded-md">Submissions OPEN</span>
                                <span className="text-slate-400  ml-4">11:34</span>
                            </div>
                        </div>
                        <div>
                            <ul>
                                {videos.map((video, index) => (
                                    <DraggableRow key={video.id} id={video.id} index={index} moveRow={moveRow}>
                                        <div className="border-2 border-slate-500 rounded-md my-5" >
                                            {/* <img src={video.photo} alt={video.title} /> */}
                                            <div className="py-5 px-5">
                                                <div className="grid grid-cols-5 gap-x-5">
                                                    <h3 className="text-white">{video.id}</h3>
                                                    <h3 className="text-sm text-white">Title : {video.title}</h3>
                                                    <div>
                                                        <img className="h-20" src={video.photo} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white">Author : {video.username}</h3>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white">Likes : ${video.like}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <p>Uploaded by: {video.username}</p>
                                    <p>Likes: {video.like}</p> */}
                                        </div>
                                    </DraggableRow>

                                ))}
                            </ul>
                            <div className="flex justify-between pb-20">
                                <button className="bg-blue-500 rounded-md px-5 py-2" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                                <button className="bg-blue-500 rounded-md px-5 py-2" onClick={handleNextPage}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                <SnackBar></SnackBar>

            </>
        </DragAndDropContext>

    );
};

export default AdminDashboardPage;