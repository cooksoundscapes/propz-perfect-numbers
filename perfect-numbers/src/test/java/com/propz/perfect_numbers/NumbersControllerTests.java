package com.propz.perfect_numbers;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;

@WebMvcTest(NumbersController.class)
public class NumbersControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private NumbersService numbersService;

    @Test
    public void shouldCheckPerfectNumber() throws Exception {
        long perfectNumber = 28;
        Mockito.when(numbersService.isPerfectNumber(perfectNumber)).thenReturn(true);

        this.mvc.perform(MockMvcRequestBuilders.get("/api/is-perfect-number/" + perfectNumber))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isBoolean());
    }

    @Test
    public void shouldGetPerfectNumberList() throws Exception {
        Mockito.when(numbersService.findPerfectNumbersInRange(0L, 0L)).thenReturn(new ArrayList<>());
        this.mvc.perform(MockMvcRequestBuilders.get("/api/perfect-numbers-in-range?from=0&to=0"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }
}
