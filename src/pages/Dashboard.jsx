import { useEffect, useState } from 'react';
import LogoSmall from "../assets/LogoSmall";
import { useNavigate } from 'react-router-dom';
import { getPlots } from '../helpers/apiService';
import { getInitials } from '../helpers/tools';
import ArrowRight from '../assets/ArrowRight';
import MapComponent from '../common/MapComponent/MapComponent';
import { LoadScript } from '@react-google-maps/api';

export const mapContainerStyle = { width: '100%', height: '93%' };
export const zoom = 15.5;

const DashboardPage = () => {
    const [userPlots, setUserPlots] = useState([]);
    const [userFullName, setUserFullName] = useState('');
    const [selectedPlot, setSelectedPlot] = useState(null);
    const [displayPlot, setDisplayPlot] = useState(null);
    const [plotsFetched, setPlotsFetched] = useState(false); // New state to track whether plots are fetched

    const navigate = useNavigate();

    useEffect(() => {
        const storedFullName = localStorage.getItem('userFullName');
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');

        if (storedFullName && storedUserId && storedToken && !plotsFetched) { // Add condition to check if plots are already fetched
            setUserFullName(storedFullName);
            fetchUserPlots(storedUserId, storedToken);
            setPlotsFetched(true); // Set plotsFetched to true after fetching plots
        } else if (!storedFullName || !storedUserId || !storedToken) {
            navigate('/login');
        }
    }, [navigate, plotsFetched]); // Include plotsFetched in the dependency array

    const fetchUserPlots = async (userId, token) => {
        try {
            console.log('TRYNA get plots', userId, token);
            const result = await getPlots(userId, token);
            console.log('REZ MAPS', result);
            setUserPlots(result);
        } catch (error) {
            console.error('Failed to fetch plots:', error);
        }
    };

    useEffect(() => {
        if (selectedPlot && userPlots.length > 0) {
            const plot = userPlots.find(plot => plot.plot_id === selectedPlot);
            console.log('plots', userPlots)
            console.log('Selected plot found:', plot);
            setDisplayPlot(plot);
        } else {
            setDisplayPlot(null)
        }
    }, [selectedPlot, userPlots]);

    console.log('selected plot', displayPlot)

    return (
        <div className="h-[100vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 py-5 pr-5">
                <div className='scale-[65%]'>
                    <LogoSmall />
                </div>
                {
                    selectedPlot ? (
                        <>
                            <div className=''>
                                <div className='ml-[-25px] flex flex-col'>
                                    <h1 className='font-bold'>{displayPlot?.plot_name}</h1>
                                    <div className='flex flex-row items-center gap-4'>
                                        <p className='font-medium'>VRA Mapa</p>
                                        <div className='flex gap-2 mt-1 opacity-50'>
                                            {displayPlot?.plot_legend.map((legend, legendIndex) => (
                                                <div key={legendIndex} className='w-3 h-3 rounded-sm' style={{ backgroundColor: legend.color }} title={legend.description}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mr-2.5 opacity-50' onClick={() => setSelectedPlot(null)}>
                                X
                            </div>
                        </>

                    ) : (
                        <div className='flex gap-5'>
                            <div className="text-right">
                                <h1 className='font-bold'>{userFullName}</h1>
                                <p className='font-light opacity-50'>Klijent</p>
                            </div>
                            <div className='border flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white bg-opacity-10 text-[18px]'>
                                {userFullName && getInitials(userFullName)}
                            </div>
                        </div >
                    )
                }

            </div >
            {
                !selectedPlot && (
                    <div className='mt-[30px] h-[90%] overflow-auto px-4'>
                        {userPlots.length > 0 && userPlots.map((plot, index) => (
                            <div key={plot.plot_id} className='flex w-full items-center px-3 py-4 mb-4'>
                                <div className='w-[50px] h-[50px] border flex rounded-full items-center justify-center bg-white bg-opacity-10'>
                                    #{++index}
                                </div>
                                <div className='ml-4 flex flex-col'>
                                    <h1 className='font-bold'>{plot?.plot_name}</h1>
                                    <div className='flex flex-row items-center gap-4'>
                                        <p className='font-medium'>VRA Mapa</p>
                                        <div className='flex gap-2 mt-1'>
                                            {plot?.plot_legend.map((legend, legendIndex) => (
                                                <div key={legendIndex} className='w-3 h-3 rounded-sm' style={{ backgroundColor: legend.color }} title={legend.description}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button className='ml-auto' onClick={() => setSelectedPlot(plot.plot_id)}><ArrowRight /></button>
                            </div>
                        ))}
                    </div>
                )
            }

            {
                displayPlot && (
                    <div className='absolute top-[113px] w-[90%] mx-auto ml-[50%] translate-x-[-50%] h-20 z-10 bg-[#1A4361] rounded-md p-2'>
                        <div className='grid grid-cols-3 grid-rows-2 gap-2 ml-7 mt-1'>
                            {displayPlot?.plot_legend.slice(0, 6).map((legend, legendIndex) => (
                                <div key={legendIndex} className='flex items-center gap-0.5'>
                                    <div className='w-3 h-3 rounded-sm' style={{ backgroundColor: legend.color }} title={legend.description}></div>
                                    <span>{legend.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            {

                displayPlot && (<div className='h-[92.5vh] mt-[30px] rounded-2xl overflow-hidden relative border border-[#012F50]'>
                    <MapComponent plotData={displayPlot} apiKey={"AIzaSyAXRm_3-JRyeQt-4oaYuNut4dfAE3ZUz_M"} mapContainerStyle={mapContainerStyle} zoom={zoom} />
                </div>)
            }

        </div >
    );
}

export default DashboardPage;
