import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import api from '../../services/api';
import './dashboard.css'

export default function DashBoard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const valueByType = new Map();
            try {
                const id = localStorage.getItem('userId')
                const response = await api.get(`investimentos/all/${id}`);
                response.data.result.forEach(el => {
                    if (el.preco_compra != '') {
                        if (valueByType.has(el.Tipo)) {
                            const newValue = valueByType.get(el.Tipo) + el.preco_compra;
                            valueByType.set(el.Tipo, newValue)
                        } else {
                            valueByType.set(el.Tipo, el.preco_compra)
                        }
                    }
                });
                const arraydataDeObjetos = Array.from(valueByType, ([name, value]) => ({ name, value }));
                console.log(arraydataDeObjetos);
                setData(arraydataDeObjetos);
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h1 className='dashboardDiv'>Gráfico de investimentos</h1>

        <div className='dashboardDiv'>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
        </div>

    )
}