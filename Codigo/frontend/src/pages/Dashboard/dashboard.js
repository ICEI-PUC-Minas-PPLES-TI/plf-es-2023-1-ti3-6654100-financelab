import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import api from '../../services/api';

export default function DashBoard() {
    const [data, setData] = useState([]);
    // const data = [
    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 300 },
    //     { name: 'Group D', value: 200 },
    // ];

    useEffect(() => {
        console.log('poi');
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

    // async function loadAllData(event) {
    //     event.preventDefault();
    //     const valueByType = new Map();
    //     try {
    //         const id = localStorage.getItem('userId')
    //         const response = await api.get(`investimentos/all/${id}`);
    //         response.data.forEach(el => {
    //             if (el.preco_compra != '') {
    //                 if (valueByType.has(el.Tipo)) {
    //                     const newValue = valueByType.get(el.Tipo) + el.preco_compra;
    //                     valueByType.set(el.Tipo, newValue)
    //                 } else {
    //                     valueByType.set(el.Tipo, el.preco_compra)
    //                 }
    //             }
    //         });
    //         const arraydataDeObjetos = Array.from(valueByType, ([name, value]) => ({ name, value }));

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h1>Gráfico de investimentos</h1>
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
    )
}