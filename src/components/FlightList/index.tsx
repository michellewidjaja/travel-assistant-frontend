import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image'
import FlightLogo from '../../assets/flight-logo.png';

const FlightList = ({ flightInfo }) => {
    return (
        <Grid container spacing={2}>
            {flightInfo && flightInfo.data && flightInfo.data.length > 0 && flightInfo.data.map((flight, flightIdx) => (
              <Grid item xs={12} sm={6} md={6} key={flightIdx}>
                  <Paper elevation={6} className="p-4" 
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: '#272525',
                      color: '#fff',
                      borderRadius: '20px'
                    }}
                    >
                      {flight.itineraries.map((itinerary, itineraryKey) => (
                          itinerary.segments.map((segment, segmentKey) => ( 
                            <div className="flex w-full">
                              <Image src={FlightLogo}
                                alt="airline logo" 
                                className="w-12 h-12 mr-2 rounded-[10px]" 
                                width={48}
                                height={48}
                              />
                              <div key={itineraryKey} className="border-b border-[#7b7676] mb-2 w-full">
                                <div className="text-[12px]">{flightInfo.dictionaries.carriers[segment.carrierCode]}</div>
                                <div key={segmentKey} className="mb-2">
                                  <div className="text-[12px]">{flightInfo.dictionaries.aircraft[segment.aircraft.code]}</div>
                                  <div className="font-bold text-[16px]">{segment.departure.iataCode} - {segment.arrival.iataCode}</div>
                                </div>
                              </div>
                            </div>
                          ))
                      ))}
                      <Typography variant="h6" className="text-[#438dff] font-bold ml-[55px]">{flight.price.total} {flight.price.currency}</Typography>
                  </Paper>
              </Grid>
            ))}
        </Grid>
    );
};

export default FlightList;
