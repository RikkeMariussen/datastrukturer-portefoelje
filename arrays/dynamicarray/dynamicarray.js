import StaticArray from "../staticarray/staticarray.js";

export default class DynamicArray {
    
    //In case capacity is not set, it will automatically be set to 10
    constructor(capacity = 10) {
        this.arrCapacity = capacity;
        this.aArray = new StaticArray(capacity);
        this.arrSize = 0;
    }

    add(item) {
        if (this.arrSize >= this.arrCapacity) {
            this.grow();
        }
        this.aArray.set(this.arrSize, item);
        this.arrSize++;
    }

    remove(index) {
        //Checks if it is out of bounds
        if (index < 0 || index >= this.arrSize) {
            throw new RangeError(`Index: ${index} is out of bounds`);
        }
        
        for (let i = index ; i < this.arrSize - 1 ; i++) {
            this.aArray.set(i, this.aArray.get(i+1));
        }

        this.aArray.set(this.arrSize - 1, null);
        this.arrSize--;
    }

    grow() {
        const newCapacity = this.arrCapacity * 2;
        const newArray = new StaticArray(newCapacity);

        for (let i = 0 ; i < this.arrSize ; i++) {
            newArray.set(i, this.aArray.get(i));
        }
        this.aArray = newArray;
        console.log(`Array capacity increased from ${this.arrCapacity} to ${newCapacity}`);
        this.arrCapacity = newCapacity;
    }

    get(index) {
        if(index < 0 || index >= this.arrSize) {
            throw new RangeError(`Index: ${index} is outside of the range`);
        }
        return this.aArray.get(index);
    }

    set(index, item) {
        if(index < 0 || index >= this.arrSize) {
            throw new RangeError(`Index: ${index} is outside of the range`);
        }
        this.aArray.set(index, item);
    }

    size() {
        return this.arrSize;
    }

    capacity() {
        return this.arrCapacity;
    }

    clear() {
        this.aArray = new StaticArray(this.arrCapacity);
        this.arrSize = 0;
    }
}