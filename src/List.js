import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';

const List = ({ list, deleteHandler, editHandler, markHandler }) => {



    return (
        <div className='list-items'>
            {list.map((item, index) => {
                const { id, text, mark } = item;
                return (
                    <div key={id} className="list-item">
                        {/* <button className='mark-btn' type='button' onClick={(e) => markHandler(id)}>
                            <GiCheckMark />
                        </button> */}
                        <p className={`${mark ? 'text text-und' : 'text'}`} onClick={(e) => markHandler(id)}><span>{index + 1}.</span> {text}</p>
                        <div className="btn-section">

                            <FaEdit className='edit-btn' onClick={(e) => editHandler(id)} />


                            <FaTrash className='del-btn' onClick={(e) => deleteHandler(id)} />


                        </div>

                    </div>


                )
            })}

        </div>
    )
}

export default List
