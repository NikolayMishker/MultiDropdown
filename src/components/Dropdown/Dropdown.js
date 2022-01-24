import './Dropdown.css';
import { useState, useRef, useEffect } from 'react';

const Dropdown = (props) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState(props.options);
    const [currentCard, setCurrentCard] = useState(null);

    const dropdownRef = useRef(null)
    const dropdownOptionRef = useRef(null)

    const closeDropdownHandler = (event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            dropdownOptionRef.current && !dropdownOptionRef.current.contains(event.target)){
            setDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdownHandler)
    }, [])

    useEffect(() => {
        props.onChange(selectedItems);
    }, [props, selectedItems])

    const clickDropdownHandler = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    function selectItemHandler(event, option) {
        event.stopPropagation();
        setSelectedItems((prev) => [...prev, option]);         
        setOptions((prev) => prev.filter(x => x !== option))
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
        var options = document.querySelectorAll('.itemHover');
        options.forEach((option) => {
            option.classList.remove('itemHover');
        })
    }

    function dragLeaveHandler(e, item){
        var options = document.querySelectorAll('.itemHover');
        options.forEach((option) => {
            option.classList.remove('itemHover');
        })
    }

    function dragEnterHandler(e, item){
        e.target.classList.add('itemHover');
        
    }

    function dragOverHandler(e, item){
        e.preventDefault();
    }

    function dropHandler(e, item){
        e.preventDefault();
        e.stopPropagation();

        let items = [...selectedItems];
        const firstElementIndex = items.indexOf(item);
        const secondElementIndex = items.indexOf(currentCard);

        const arr = moveArrayElements(items, secondElementIndex, firstElementIndex)
        setSelectedItems(arr);
        setCurrentCard(null);
    }

    function moveArrayElements(array, startIndex, endIndex) {
        while (startIndex < 0) {
            startIndex += array.length;
        }
        while (endIndex < 0) {
            endIndex += array.length;
        }
        if (endIndex >= array.length) {
            var k = endIndex - array.length + 1;
            while (k--) {
                array.push(undefined);
            }
        }
        array.splice(endIndex, 0, array.splice(startIndex, 1)[0]);
        return array;
    };

    return(
        <div className='dropdown'
            ref={dropdownRef}
            onClick={clickDropdownHandler}
            tabIndex="0" >          
            <div 
                className='dropdown__selectedItems itemList'>
                {
                    selectedItems.length === 0 ? <p className='dropdown__title'>{props.title}</p> :

                    selectedItems.map((item) => (
                            <p 
                                className='option'
                                key={item.id} 
                                draggable='true'
                                onDragStart={(e) => dragStartHandler(e, item)}
                                onDragEnter={(e) => dragEnterHandler(e, item)}
                                onDragLeave={(e) => dragLeaveHandler(e, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDragOver={(e) => dragOverHandler(e, item)}
                                onDrop={(e) => dropHandler(e, item)}>{item.value}
                                <span onClickCapture={(e) => deleteSelectedItemHandler(e, item)}> x</span>
                            </p> 
                    ))
                }
            </div>
            <div ref={dropdownOptionRef} className='dropdown__info'>
                { isDropdownOpen ? 
                    <ul className='itemList'>
                        {
                            options.map(option => (
                                <li key={option.id} onClick={(event) => selectItemHandler(event, option)}>
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