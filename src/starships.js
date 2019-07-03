import React from "react";
import axios from "axios";

export default class Starships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: [],
            moreDetails: null
        };
        this.moreDetails = this.moreDetails.bind(this);
    }

    componentDidMount() {
        axios
            .get(`https://swapi.co/api/starships`)
            .then(response => {
                this.setState({ starships: response.data.results });
            })
            .catch(error => {
                console.log(error);
            });
    }

    moreDetails(starship) {
        axios
            .get(starship.url)
            .then(response => {
                this.setState({ moreDetails: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { starships, moreDetails } = this.state;
        if (moreDetails) {
            return (
                <div className="more-details">
                    <div className="details">Name: {moreDetails.name}</div>
                    <div className="details">Length: {moreDetails.length}</div>
                    <div className="details">Crew: {moreDetails.crew}</div>
                    <div className="details">Model: {moreDetails.model}</div>
                    <div className="details">
                        Manufacturer: {moreDetails.manufacturer}
                    </div>
                    <div className="details">
                        Consumables: {moreDetails.consumables}
                    </div>
                    <div className="details">Pilots: {moreDetails.pilots}</div>
                    <div className="details">
                        Passengers: {moreDetails.passengers}
                    </div>
                    <div className="details">MGLT: {moreDetails.MGLT}</div>
                    <button
                        className="btn"
                        onClick={() => this.setState({ moreDetails: null })}
                    >
                        back
                    </button>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="starships">
                        <table>
                            <tbody>
                                {starships.map(starship => (
                                    <tr key={starship.url}>
                                        <td>Name: {starship.name}</td>
                                        <td>Length: {starship.length}</td>
                                        <td>Crew: {starship.crew}</td>
                                        <td>
                                            <button
                                                className="btn"
                                                onClick={() =>
                                                    this.moreDetails(starship)
                                                }
                                            >
                                                more details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
    }
}
