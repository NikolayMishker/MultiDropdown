import './Dropdown.css';
import { useState, useRef, useEffect } from 'react';

const Dropdown = (props) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState(props.options);
    const [currentCard, setCurrentCard] = useState(null);

    const dropdownRef = useRef(null)

    const closeDropdownHandler = (event)=>{
        if(dropdownRef.current && isDropdownOpen && !dropdownRef.current.contains(event.target)){
            setDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdownHandler)
    })


    const clickDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    function itemSelectHandler(event, option) {
        setSelectedItems((prev) => [...prev, option]);         
        setOptions((prev) => prev.filter(x => x !== option))
        setDropdownOpen(false);

    }

    function deleteSelectedItemHandler(event, item) {
        event.stopPropagation();
        setSelectedItems((prev) => prev.filter(x => x !== item));         
        setOptions((prev) => [...prev, item])
    }

    function dragStartHandler(e, item) {
        setCurrentCard(item);
    }

    function dragEndHandler(e){
    }

    function dragOverHandler(e){
        e.preventDefault();
    }

    function dropHandler(e, item){
        e.preventDefault();

        let items = [...selectedItems];
        const firstElementIndex = items.indexOf(item);
        const secondElementIndex = items.indexOf(currentCard);

        const arr = swap(firstElementIndex, secondElementIndex, items);
        setSelectedItems(arr);
    }

    function swap(first, last, array){
        const temp =  array[first];
        array[first] = array[last];
        array[last] = temp;

        return array;
    }

    return(
        <div className='dropdown'
            ref={dropdownRef}
            onClick={clickDropdown}
            tabIndex="0" >          
            <div 
                className='dropdown__selectedItems item'>
                {
                    selectedItems.length === 0 ? <p className='dropdown__title'>{props.title}</p> :

                    selectedItems.map((item) => (
                            <p
                                className='options'
                                key={item.id} 
                                draggable='true'
                                onDragStart={(e) => dragStartHandler(e, item)}
                                onDragLeave={(e) => dragEndHandler(e)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e)}
                                onDrop={(e) => dropHandler(e, item)}>
                                <span>{item.value}</span>
                                <span className='cross' onClickCapture={(e) => deleteSelectedItemHandler(e, item)}>x</span>
                            </p> 
                    ))
                }
            </div>
            <div className='dropdown__info'>
                { isDropdownOpen ? 
                    <ul className='item'>
                        {
                            options.map(option => (
                                <li key={option.id} onClick={(event) => itemSelectHandler(event, option)}>
                                    <span>{option.value}</span>
                                </li>
                            ))
                        }
                        {
                            options.length === 0 ?
                            <li>
                                <span>No options</span>
                            </li>: null
                        }
                    </ul>
                
                : null }
                
            </div>
        </div>
    )
} 

export default Dropdown;