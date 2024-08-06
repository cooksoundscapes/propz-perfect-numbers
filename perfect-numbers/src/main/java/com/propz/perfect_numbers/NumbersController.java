package com.propz.perfect_numbers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NumbersController {

    private final NumbersService numbersService;

    @Autowired
    public NumbersController(NumbersService numbersService) {
        this.numbersService = numbersService;
    }

    @GetMapping("/is-perfect-number/{targetNumber}")
    ResponseEntity<Boolean          > isPerfectNumber(@PathVariable Long targetNumber) {
        boolean result = this.numbersService.isPerfectNumber(targetNumber);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/perfect-numbers-in-range")
    ResponseEntity<List<Long>> findPerfectNumbersInRange(
            @RequestParam("from") Long from,
            @RequestParam("to") Long to
    ) {
        List<Long> result = this.numbersService.findPerfectNumbersInRange(from, to);
        return ResponseEntity.ok(result);
    }
}
