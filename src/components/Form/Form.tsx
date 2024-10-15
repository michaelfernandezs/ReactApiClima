import { countries } from "../../data/countries";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./form.module.css";
import type { SearchType } from "../../types";
import Alert from "./Alert/Alert";


type FormProps={
    fetchWeather: (search:SearchType) =>Promise <void>
   
}

export default function Form({fetchWeather}:FormProps) {
    const [search, setsearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const[alert,setAlert] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setsearch({ ...search, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWeather(search)

    }
    return (
        <form 
        className={styles.form}
        onSubmit={handleSubmit}
        >   {alert&&<Alert>{alert}</Alert>}
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais</label>
                <select
                    id="country"
                    value={search.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option value="">--seleccione un pais---</option>
                    {countries.map(country => (
                        <option key={country.code} value={country.code}
                        >{country.name}</option>
                    ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}