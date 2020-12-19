import React, { useState, useRef, useEffect, useMemo } from 'react';
import AutoCompleteItem from './AutoCompleteItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(3),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  
const AutoComplete = ({ data, onSelect }) => {
    const classes = useStyles();
    const [isVisbile, setVisiblity] = useState(false);
    const [search, setSearch] = useState('');
    const [cursor, setCursor] = useState(-1);

    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const scrollIntoView = (position) => {
        searchResultRef.current.parentNode.scrollTo({
            top: position,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return () => {};
        }

        let listItems = Array.from(searchResultRef.current.children);
        listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
    }, [cursor]);

    const suggestions = useMemo(() => {
        if (!search) return data;

        setCursor(-1);
        scrollIntoView(0);

        return data.filter(
            (item) =>
                item.status.toLowerCase().includes(search.toLowerCase()) ||
                item.assigned_to.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    const handleClickOutside = (event) => {
        if (
            searchContainer.current &&
            !searchContainer.current.contains(event.target)
        ) {
            hideSuggestion();
        }
    };

    const showSuggestion = () => setVisiblity(true);

    const hideSuggestion = () => setVisiblity(false);

    const keyboardNavigation = (e) => {
        
        if (e.key === 'ArrowDown') {
            isVisbile
                ? setCursor((c) => (c < suggestions.length - 1 ? c + 1 : c))
                : showSuggestion();
        }

        if (e.key === 'ArrowUp') {
            setCursor((c) => (c > 0 ? c - 1 : 0));
        }

        if (e.key === 'Escape') {
            hideSuggestion();
        }

        if (e.key === 'Enter' && cursor > 0) {
            setSearch(suggestions[cursor].status);
            hideSuggestion();
            onSelect(suggestions[cursor]);
        }
    };

    return (
        <div
            style={{ height: '100%', marginTop: '30px', marginBottom: '50px' }}
            ref={searchContainer}
        >
            <TextField
                label="Search tasks, @Users..."
                type='text'
                name='search'
                id="outlined-basic"
                variant="outlined"
                className='search-bar'
                autoComplete='off'
                value={search}
                onClick={showSuggestion}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => keyboardNavigation(e)}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                )
                }}
            />

            <div
                className={`search-result ${
                    isVisbile ? 'visible' : 'invisible'
                }`}
            >
                <br/>
                <div className="ml-5">
                    <Link href="#results">
                        <Button type='submit' aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary">
                            Projects
                        </Button>
                    </Link>
                    <Button className="ml-1" type='submit' aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary">
                        Contractors
                    </Button>
                    <Button className="ml-1" type='submit' aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary">
                        Resources
                    </Button>
                    <br/><br/>
                </div>
                <ul className='list-group' ref={searchResultRef}>
                    {suggestions.map((item, idx) => (
                        <AutoCompleteItem
                            key={idx}
                            onSelectItem={() => {
                                hideSuggestion();
                                setSearch(item.project_name);
                                onSelect(item);
                            }}
                            isHighlighted={cursor === idx ? true : false}
                            {...item}
                        />
                    ))}
                </ul>
                <Link href="#results" style={{textDecoration: 'none'}}>
                    <IconButton className={classes.margin} size="small" style={{color: '#0000FF'}}>
                        View More <ArrowRightAltIcon fontSize="large" className={classes.extendedIcon} />
                    </IconButton>
                </Link>
            </div>
        </div>
    );
};

export default AutoComplete;
