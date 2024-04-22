import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/products`).then(({data}) => {
            setProducts(data);
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: "Are you sure ?",
            text: "You won't be able to revert this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!!!"
        }).then((result) => {
            return result.isConfirmed
        })

        if(!isConfirm){
            return;
        }

        await axios.delete(`http://localhost:8000/api/products/${id}`).then(({data}) => {
            Swal.fire({
                icon: 'success',
                text: data.message
            })
            fetchProduct();
        }).catch(({response:{data}})=>{
            Swal.fire({
                text: data.message,
                icon: 'error'
            })
        })
    }

    async function search(key){
        console.warn(key);

        let result = await fetch('http://localhost:8000/api/search/'+key);
        result = await result.json();
        setProducts(result)
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-12">
                <Link className='btn btn-primary mb-2 float-start' to={"/product/create"}>
                    Create Product
                </Link>
                <input type="search" className='float-end' name='search' onChange={(e) => search(e.target.value)} placeholder='Search'/>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <td>Title</td>
                                    <td>Description</td>
                                    <td>Image</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((row, key) => (
                                        <tr key={key}>
                                            <td>{row.title}</td>
                                            <td>{row.description}</td>
                                            <td><img width="50px" src={`http://localhost:8000/storage/product/image/${row.image}`} alt="" /></td>
                                            <td>
                                                <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                    Edit
                                                </Link>
                                                <Button variant='danger' onClick={() => deleteProduct(row.id)}>
                                                    Delete
                                                </Button>       
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No product Found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductList
