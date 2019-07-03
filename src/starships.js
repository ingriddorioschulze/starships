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
            console.log(moreDetails);
            return (
                <div className="moreDetails">
                    <table>
                        <tr>
                            <td>Name: {moreDetails.name}</td>
                            <td>Length: {moreDetails.length}</td>
                            <td>Crew: {moreDetails.crew}</td>
                            <td>Model: {moreDetails.model}</td>
                            <td>Manufacturer: {moreDetails.manufacturer}</td>
                            <td>Consumables: {moreDetails.consumables}</td>
                            <td>Pilots: {moreDetails.pilots}</td>
                            <td>Passengers: {moreDetails.passengers}</td>
                            <td>MGLT: {moreDetails.MGLT}</td>
                        </tr>
                    </table>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="starships">
                        {starships.map(starship => (
                            <table key={starship.id}>
                                <tr>
                                    <td>Name: {starship.name}</td>
                                    <td>Length: {starship.length}</td>
                                    <td>Crew: {starship.crew}</td>
                                    <button
                                        className="btn"
                                        onClick={() =>
                                            this.moreDetails(starship)
                                        }
                                    >
                                        more details
                                    </button>
                                </tr>
                            </table>
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    }
}
