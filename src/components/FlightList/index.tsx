import React from 'react';
import { Grid, Paper, Typography, Divider } from '@mui/material';

const FlightList = ({ flightInfo }) => {
    return (
        <Grid container spacing={2}>
            {flightInfo && flightInfo.data && flightInfo.data.length > 0 && flightInfo.data.map((flight, flightIdx) => (
              <Grid item xs={12} sm={6} md={4} key={flightIdx}>
                  <Paper elevation={6} className="p-4" 
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: '#272525',
                      color: '#aaa7a7',
                      borderRadius: '20px'
                    }}
                    >
                      <div className="flex gap-4 justify-around">
                        {flight.itineraries.map((itinerary, itineraryKey) => (
                            itinerary.segments.map((segment, segmentKey) => ( 
                              <>
                                {segmentKey > 0 && <Divider orientation="vertical" flexItem style={{ height: '48px', borderColor: '#aaa7a7' }} />}
                                <div key={segmentKey} className="mb-2">
                                  <Typography variant="body1">Aircraft {segment.aircraft.code}</Typography>
                                  <Typography variant="subtitle1" className="font-bold">{segment.departure.iataCode} - {segment.arrival.iataCode}</Typography>
                                </div>
                              </>
                            ))
                        ))}
                      </div>
                      <Typography variant="h4" sx={{ color: '#438dff' }}>{flight.price.total} {flight.price.currency}</Typography>
                  </Paper>
              </Grid>
            ))}
        </Grid>
    );
};

export default FlightList;
